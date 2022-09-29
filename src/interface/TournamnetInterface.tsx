export default interface ITournament {
  id: string;
  name: string;
  organizer: string;
  game: string;
  participants: IParticipants;
  startDate: string | Date;
}
export  interface IParticipants {
  current: number;
  max: number;
}

