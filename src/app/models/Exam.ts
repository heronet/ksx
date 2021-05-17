export interface Question {
  id: string;
  title: string;
  options: string[];
  correctAnswer: string;
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
}
