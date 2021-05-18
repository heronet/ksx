export interface Question {
  id: string;
  title: string;
  options: string[];
  marks: number;
  correctAnswer: string;
  providedAnswer: string;
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
