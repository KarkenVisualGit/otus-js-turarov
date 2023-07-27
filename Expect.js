const numbersList = [1, 2, 3]; // подготовка
const indexOf5 = numbersList.indexOf(5); // выполнение
expect(indexOf5).toBe(-1); // проверкаs

expect([1, 2, 3].indexOf(5)).toBe(-1);

it("callFn alerts value entered to prompt", () => {
    jest.spyOn(window, "prompt").returnValue("123");
    window.alert = jest.fn();
    expect(window.alert).toHaveBeenCalledWith("123");
  });

  let originalAlert;
 
  beforeEach(() => {
    originalAlert = window.alert;
  });
  afterEach(() => {
    window.alert = originalAlert;
  });
   
  it("callFn alerts value entered to prompt", () => {
    jest.spyOn(window, "prompt").returnValue("123");
    expect(window.alert).toHaveBeenCalledWith("123");
  });

  const input = document.querySelector('.textInput');
  let city = input.value.trim();

  const url = 'https://get.geojs.io/v1/ip/geo.json';

  fetch(url).then((response) => {
    return response.json()
  }).then ((data) => {
    console.log(data.region);
  })