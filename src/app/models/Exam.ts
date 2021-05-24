import { QuestionOption } from "./QuestionOption";

export interface Question {
  id: string;
  title: string;
  options: QuestionOption[];
  marks: number;
  correctAnswer: QuestionOption;
  providedAnswer: QuestionOption;
  hasMath: boolean;
}

export interface Exam {
  title: string;
  id: string;
  attendees: number;
  subject: string;
  creatorId: string;
  creator: string;
  createdAt: Date;
  duration: number;
  questions: Partial<Question>[];
  totalMarks: number;
  marksObtained: number;
  newSubmission: boolean;
  participated: boolean;
  negativeMarks: number;
  submissionEnabled: boolean;
  participants: Participant[];
}
export interface Participant {
  id: string;
  username: string;
  marksObtained: number;
  examCreatorId: string;
}
