function fridayTheThirteenths(start, end) {
    const datesWithFriOn13th = [];
    do {
      const year = start;
      for (var month = 0; month < 12; month++) {
        if (new Date(year, month, 13).getDay() == 5)
          datesWithFriOn13th.push(`${month + 1}/13/${year}`);
      }
      start++;
    } while (start <= (end || 0));
    return datesWithFriOn13th.join(" ");
  
  }
  console.log(fridayTheThirteenths(2014, 2023));