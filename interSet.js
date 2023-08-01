function inter(s1, s2){
    let set1 = new Set(s1);
    let set2 = new Set(s2);
    let set = new Set();
    set.add(s1);
    set.add(s2);
    return intersection = new Set([...set1].filter((x) => set2.has(x)));
  }
  let A = new Set([1,2]), B = new Set([2,3]), C = new Set([2]), AB = inter(A,B);
  console.log(AB);
  console.log(inter(A,A));
  console.log(inter(AB,C));
  console.log(inter([...AB].sort(),[...inter(B,A)].sort()));
  console.log([...AB].sort());
  console.log([...inter(B,A)].sort());
