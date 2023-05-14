<template>
    <div class="calendar">
      <div class="header">
        <button class="prev" @click="prevMonth">&lt;</button>
        <div class="title">{{ title }}</div>
        <button class="next" @click="nextMonth">&gt;</button>
      </div>
      <div class="weekdays">
        <div v-for="day in daysOfWeek" :key="day" class="day">{{ day }}</div>
      </div>
      <div class="days">
        <div
          v-for="day in days"
          :key="day.date"
          :class="{
            today: isToday(day),
            selected: isSelected(day),
            notCurrentMonth: isNotCurrentMonth(day),
          }"
          @click="select(day)"
        >
          {{ day.day }}
        </div>
      </div>
    </div>
  </template>
   
  <script>
    import { ref, computed } from "vue";
   
    export default {
      name: "FeiCalendar",
      props: {
        selectedDate: Date,
      },
      emits: ["update:selectedDate"],
      setup(props, { emit }) {
        const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const currentDate = ref(new Date());
        const selectedDate = ref(props.selectedDate || currentDate.value);
   
        const daysOfWeek = computed(() => {
          return weekdays;
        });
   
        const days = computed(() => {
          const year = currentDate.value.getFullYear();
          const month = currentDate.value.getMonth();
          const daysInMonth = new Date(year, month + 1, 0).getDate();
          const daysInLastMonth = new Date(year, month, 0).getDate();
          const firstDayOfMonth = new Date(year, month, 1).getDay();
   
          const days = [];
          let day = 1;
          let lastMonthDay = daysInLastMonth - firstDayOfMonth + 1;
          let nextMonthDay = 1;
   
          for (let i = 0; i < 6 * 7; i++) {
            if (i < firstDayOfMonth) {
              days.push({
                date: new Date(year, month - 1, lastMonthDay),
                day: lastMonthDay,
                isLastMonth: true,
                isNextMonth: false,
              });
              lastMonthDay++;
            } else if (i >= firstDayOfMonth + daysInMonth) {
              days.push({
                date: new Date(year, month + 1, nextMonthDay),
                day: nextMonthDay,
                isLastMonth: false,
                isNextMonth: true,
              });
              nextMonthDay++;
            } else {
              const date = new Date(year, month, day);
              days.push({ date, day, isLastMonth: false, isNextMonth: false });
              day++;
            }
          }
   
          return days;
        });
   
        const title = computed(
          () =>
            `${currentDate.value.toLocaleString("default", {
              month: "long",
            })} ${currentDate.value.getFullYear()}`
        );
   
        const prevMonth = () => {
          currentDate.value = new Date(
            currentDate.value.getFullYear(),
            currentDate.value.getMonth() - 1,
            1
          );
        };
   
        const nextMonth = () => {
          currentDate.value = new Date(
            currentDate.value.getFullYear(),
            currentDate.value.getMonth() + 1,
            1
          );
        };
   
        const isToday = (day) => {
          const today = new Date();
          return day.date.toDateString() === today.toDateString();
        };
   
        const isSelected = (day) => {
          return day.date.toDateString() === selectedDate.value.toDateString();
        };
   
        const isNotCurrentMonth = (day) => {
          return day.isLastMonth || day.isNextMonth;
        };
   
        const select = (day) => {
          selectedDate.value = day.date;
          emit("update:selectedDate", day.date);
        };
   
        return {
          daysOfWeek,
          days,
          title,
          prevMonth,
          nextMonth,
          isToday,
          isSelected,
          isNotCurrentMonth,
          select,
        };
      },
    };
  </script>
   
  <style>
    .calendar {
      max-width: 500px;
      margin: 0 auto;
      margin-top: 10px;
      font-family: Arial, sans-serif;
    }
   
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
   
    .title {
      font-size: 18px;
      font-weight: bold;
    }
   
    .weekdays {
      display: flex;
      justify-content: space-around;
      margin-bottom: 10px;
    }
   
    .day {
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
    }
   
    .days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      grid-gap: 10px;
    }
   
    .today {
      background-color: lightblue;
    }
   
    .selected {
      background-color: blue;
      color: white;
    }
   
    .notCurrentMonth {
      color: #ccc;
    }
  </style>