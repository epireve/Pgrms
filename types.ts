export enum Role {
  Student = 'STUDENT',
  Supervisor = 'SUPERVISOR',
  Admin = 'ADMIN',
  HOD = 'HOD',
  Examiner = 'EXAMINER'
}

export type UserStatus = 'Active' | 'Suspended' | 'Completed';
export type UserMode = 'Full-time' | 'Part-time';
export type SupervisorRole = 'Main Supervisor' | 'Co-supervisor' | 'Assistant Supervisor';

export interface SupervisorAssignment {
    userId: string;
    role: SupervisorRole;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl: string;
  status?: UserStatus;
  // Student-specific fields
  mode?: UserMode;
  programme?: string;
  researchTitle?: string;
  hodId?: string;
  supervisors?: SupervisorAssignment[];
  lastUpdated?: Date;
}

export enum MilestoneStatus {
  Pending = 'PENDING',
  AwaitingEndorsement = 'AWAITING_ENDORSEMENT',
  Completed = 'COMPLETED',
  Returned = 'RETURNED',
  Overdue = 'OVERDUE'
}

export interface MilestoneHistory {
    action: 'SUBMITTED' | 'ENDORSED' | 'RETURNED';
    date: Date;
    actorId: string;
    comments?: string;
}


export interface Milestone {
  id: string;
  title: string;
  dueDate: Date;
  status: MilestoneStatus;
  description: string;
  required: boolean;
  order: number;
  actualCompletionDate?: Date;
  evidenceFile?: { name: string, url: string };
  history: MilestoneHistory[];
}

export enum ReportStatus {
  NotSubmitted = 'NOT_SUBMITTED',
  Submitted = 'SUBMITTED',
  Approved = 'APPROVED',
  Rejected = 'REJECTED'
}

export interface ProgressReport {
  id: string;
  period: string; // e.g., "Semester 1 2024"
  submissionDate?: Date;
  status: ReportStatus;
}

export interface SupervisionLog {
  id: string;
  date: Date;
  discussionPoints: string;
  actionsAgreed: string;
  supervisor: string;
}

export interface StudyPlanTask {
    id: string;
    name: string;
    start: Date;
    end: Date;
    progress: number; // 0-100
}

export enum NotificationType {
    Deadline = 'DEADLINE',
    Submission = 'SUBMISSION',
    Approval = 'APPROVAL',
    Meeting = 'MEETING',
    System = 'SYSTEM'
}

export interface Notification {
    id: string;
    type: NotificationType;
    message: string;
    date: Date;
    read: boolean;
}

export enum ThesisStatus {
    Submission = 'SUBMISSION',
    Evaluation = 'EVALUATION',
    Acceptance = 'ACCEPTANCE',
    ExaminerAppointment = 'EXAMINER_APPOINTMENT',
    AppointmentApproval = 'APPOINTMENT_APPROVAL',
    ExaminerInvitation = 'EXAMINER_INVITATION',
    ExaminerAcceptance = 'EXAMINER_ACCEPTANCE',
    ExaminationViva = 'EXAMINATION_VIVA',
    Recommendation = 'RECOMMENDATION',
    Result = 'RESULT',
    Corrections = 'CORRECTIONS',
    Resubmission = 'RESUBMISSION',
    FinalAcceptance = 'FINAL_ACCEPTANCE',
    RepositoryDeposit = 'REPOSITORY_DEPOSIT'
}

export interface ThesisSubmission {
    id: string;
    version: number;
    submittedAt: Date;
    status: ThesisStatus;
    statusHistory: { status: ThesisStatus, date: Date, notes?: string }[];
}