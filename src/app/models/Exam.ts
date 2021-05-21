import { QuestionOption } from "./QuestionOption";

export interface Question {
  id: string;
  title: string;
  options: QuestionOption[];
  marks: number;
  correctAnswer: QuestionOption;
  providedAnswer: QuestionOption;
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
}
