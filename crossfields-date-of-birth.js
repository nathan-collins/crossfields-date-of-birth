Polymer({

  is: 'crossfields-date-of-birth',

  properties: {
    defaultDay: {
      type: Number
    },

    defaultMonth: {
      type: String
    },

    defaultYear: {
      type: Number
    },

    age: {
      type: Number,
      notify: true,
      value: 0
    },

    ageLabel: {
      type: String,
      value: 'Age:'
    },

    maximumAge: {
      type: Number,
      value: 20
    },

    months: {
      type: Array,
      value: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ]
    }
  },

  listeners: {
    'iron-select': 'calculateAge'
  },

  getSetDay: function(defaultDay) {
    if (defaultDay) return defaultDay;
    return new Date().getDay();
  },

  getSetMonth: function(defaultMonth) {
    if (defaultMonth) return defaultMonth;
    return new Date().getMonth();
  },

  getSetYear: function(defaultYear) {
    if (defaultYear) return defaultYear;
    return new Date().getFullYear();
  },

  _getAllDays: function() {
    var days = [];
    for (var i = 1; i <= 31; i++) {
      days.push(i);
    }
    return days;
  },

  _getAllYears: function(maximumAge) {
    var year = new Date();
    var years = [];
    var currentYear = year.getFullYear();
    var finalYear = currentYear - maximumAge;

    for( var i = currentYear; i >= finalYear; i-- ) {
      years.push(i);
    }

    return years;
  },

  calculateAge: function() {
    var age = 0;

    var today = new Date();
    var selectedDate = new Date(this.selectedDay + " " + this.selectedMonth + " " + this.selectedYear);

    var age = today.getFullYear() - selectedDate.getFullYear();
    var month = today.getMonth() - (selectedDate.getMonth() + 1);
    var day = today.getDate() - selectedDate.getDate();

    age = this.checkDayMonth(age, day, month, selectedDate, today);

    this.set('age', age);
  },

  checkDayMonth: function(age, day, month, selectedDate, today) {
    if(month < 0) age--;
    if(month === 0 && today.getDate() < selectedDate.getDate()) age--;
    if(day >= 0 && month == -1) age++;

    if(age < 0) return 0;

    return age;
  },

  dayChanged: function(event) {
    this.set('selectedDay', event.detail.item.textContent);
  },

  monthChanged: function(event) {
    this.set('selectedMonth', event.detail.item.textContent);
  },

  yearChanged: function(event) {
    this.set('selectedYear', event.detail.item.textContent);
  }

});
