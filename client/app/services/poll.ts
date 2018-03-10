export class Poll {
  options: [
    {
      number: number;
      option: string,
      poll: number
    }
  ];
  question: string;
  user: string;
  voters: [string];
  _id: string;
}
