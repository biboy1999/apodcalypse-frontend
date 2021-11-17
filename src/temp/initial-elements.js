const chartData = [...Array(50)].map(() => ({
  time: null,
  cpu: Math.random() * 100,
  memory: Math.random() * 8192,
}));

// const chartData = [
//   {
//     time: '2020/01/01 12:20:50',
//     cpu: 100
//   },
//   {
//     time: '2020/01/01 12:20:55',
//     cpu: 20
//   },
// ];

// eslint-disable-next-line import/prefer-default-export
export { chartData };
