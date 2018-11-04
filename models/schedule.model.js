function getSchedule(birthDate){
   var schedule = [];
   var date = new Date(birthDate);
   var month = date.getMonth()
   var d = {};
   d[0] = date;
   d[2] = new Date(date);
   d[2].setMonth(month + 2);
   d[4] = new Date(date);
   d[4].setMonth(month + 4);
   d[6] = new Date(date);
   d[6].setMonth(month + 6);
   d[9] = new Date(date);
   d[9].setMonth(month + 9);
   d[18] = new Date(date);
   d[18].setMonth(month + 18);

   var vaccines = {
      '0': ['BCG', 'HepB-1'],
      '2': ['DTwP-1', 'HepB-2', 'Hib-1', 'PCV10-1', 'OPV-1'],
      '4': ['DTwP-2', 'HepB-3', 'Hib-2', 'PCV10-2', 'IPV', 'OPV-2'],
      '6': ['DTwP-3', 'HepB-4', 'Hib-3', 'PCV10-3', 'OPV-3'],
      '9': ['MR'],
      '18': ['Measles']
   }
   for (key in d) {
      for (i in vaccines[key]) {
         // console.log(d[key] + " " + vaccines[key][i]);
         schedule.push({
            date: d[key],
            vaccine: vaccines[key][i]
         });
      }
   }
   return schedule;
}

module.exports = getSchedule;
