package com.example.myapp.models.calendar;

import com.google.api.client.util.DateTime;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.Instant;
import java.util.*;

@Data
@AllArgsConstructor
public class TimePeriod {
    private String startString;
    private String endString;
    private Long startLong;
    private Long endLong;


    /**
     * Returns a list of time periods that are not overlapping.
     */
    public static List<TimePeriod> mergeOverlappingTimePeriods(List<TimePeriod> timePeriodList) {
        if(timePeriodList.size() <= 0) {
            return timePeriodList;
        }

        Stack<TimePeriod> stack = new Stack<>();

        timePeriodList.sort(Comparator.comparingInt(t -> t.getStartLong().intValue()));

        stack.push(timePeriodList.get(0));

        for (int i = 1; i < timePeriodList.size(); i+=1) {
            TimePeriod top = stack.peek();

            if (top.getEndLong() < timePeriodList.get(i).getStartLong()) {
                // not overlapping so just add
                stack.push(timePeriodList.get(i));
            } else if (top.getEndLong() < timePeriodList.get(i).getEndLong()) {
                // overlapping and the new event ends after current event
                top.setEndLong(timePeriodList.get(i).getEndLong());
                top.setEndString(timePeriodList.get(i).getEndString());
                stack.pop();
                stack.push(top);
            }
        }

        return new ArrayList<>(stack);
    }

    /**
     * Returns a list of time periods that between start and end time that are not in busy time period list.
     * @param busyTimePeriods non overlapping time periods
     * @param startRfc3339 start date and time of interested period (now if it is in the past)
     * @param endRfc3339 end date of interested period

     */
    public static List<TimePeriod> findFreeTimes(List<TimePeriod> busyTimePeriods, String startRfc3339, String endRfc3339) {
        DateTime now = new DateTime(Instant.now().toString());

        DateTime start = new DateTime(startRfc3339);
        if (start.getValue() < now.getValue()) {
            start = now;
        }

        DateTime end = new DateTime(endRfc3339);
        if (end.getValue() < now.getValue() || end.getValue() < start.getValue()) {
            return new ArrayList<>();
        }

        // no times are busy, so all time is free
        if (busyTimePeriods.size() <= 0) {

            return Collections.singletonList(new TimePeriod(start.toStringRfc3339(), end.toStringRfc3339(),start.getValue(), end.getValue()));
        }

        busyTimePeriods.sort(Comparator.comparingInt(t -> t.getStartLong().intValue()));

        return getTimeFreePeriods(busyTimePeriods, start, end);

    }

    private static List<TimePeriod> getTimeFreePeriods(List<TimePeriod> busyTimePeriods, DateTime start, DateTime end) {
        List<TimePeriod> freeTime = new ArrayList<>();
        TimePeriod first = busyTimePeriods.get(0);

        if (first.getStartLong() > start.getValue()) {
            // add the free time between start and a fist busy event
            freeTime.add(new TimePeriod(start.toStringRfc3339(), first.getStartString(), start.getValue(), first.getStartLong()));
        }

        for (int i = 1; i < busyTimePeriods.size(); i += 1) {
            TimePeriod second = busyTimePeriods.get(i);

            TimePeriod free = new TimePeriod(first.getEndString(), second.getStartString(), first.getEndLong(), second.getStartLong());
            freeTime.add(free);

            first = second;
        }

        if (first.getEndLong() < end.getValue()) {
            // add the free time between last busy event and end time event
            freeTime.add(new TimePeriod(first.getEndString(), end.toStringRfc3339(), first.getEndLong(), end.getValue()));
        }

        return freeTime;
    }
}
