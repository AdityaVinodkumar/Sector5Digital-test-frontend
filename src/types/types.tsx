export type Project = {
  _id: string;
  name: string;
  isCompleted: boolean;
  expectedHours: number;
  workedHours: number;
  remainedHours: number;
  completedPercent: number;
};
