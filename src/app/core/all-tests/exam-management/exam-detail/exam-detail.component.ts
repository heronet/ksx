import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Participant } from 'src/app/models/Exam';
import { AuthService } from 'src/app/services/auth.service';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-exam-detail',
  templateUrl: './exam-detail.component.html',
  styleUrls: ['./exam-detail.component.scss']
})
export class ExamDetailComponent implements OnInit, OnDestroy {
  isLoading = false;
  errors = [];
  participants: Participant[] = [];
  participantsCount = 0;
  examId: string;

  authSubscription: Subscription;
  userId: string;

  constructor(
    private route: ActivatedRoute,
    private examService: ExamService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.examId = this.route.snapshot.params['id'];
    this.fetchParticipants(this.examId);
    this.authSubscription = this.authService.authenticatedUser$.subscribe(authData => {
      if(authData != null) {
        this.userId = authData.id;
      } else
        this.userId = null;
    })
  }

  fetchParticipants(id: string) {
    this.isLoading = true;
    this.errors = [];
    this.examService.getParticipants(id).subscribe(res => {
      this.participants = res;
      this.participantsCount = res.length;
      this.isLoading = false;
    }, err => {
      if(typeof(err.error) == 'string')
        this.errors.push(err.error);
      else if(typeof(err.error) == 'object' && err.error.errors) {
        const errors = Object.values(err.error.errors);
        errors.forEach((errArray: []) => {
          errArray.forEach(err => {
            this.errors.push(err);
          });
        });
      }
      this.isLoading = false;
      this.participants = [];
    });
  }
  onClearSubmission(participantId: string, index: number) {
    this.examService.removeParticipant(this.examId, participantId).subscribe(() => {
      this.participants.splice(index, 1);
      --this.participantsCount;
    }, err => {
      console.log(err);
      
    })
  }
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

}
