import type { User, Milestone, ProgressReport, SupervisionLog, StudyPlanTask, Notification, ThesisSubmission, SupervisorAssignment } from '../types';
import { Role, MilestoneStatus, ReportStatus, NotificationType, ThesisStatus, SupervisorRole } from '../types';

// --- HELPERS ---
const today = new Date();
const addDays = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

// --- USERS ---
export const mockHOD: User = {
    id: 'HOD_CS',
    name: 'Prof. Dr. Hassan',
    email: 'hassan.hod@university.edu.my',
    role: Role.HOD,
    avatarUrl: 'https://i.pravatar.cc/150?u=HOD_CS'
};

export const mockSupervisor: User = {
    id: 'P67890',
    name: 'Dr. Siti Nurhaliza',
    email: 'siti.n@university.edu.my',
    role: Role.Supervisor,
    avatarUrl: 'https://i.pravatar.cc/150?u=P67890'
};

export const mockSupervisor2: User = {
    id: 'P11223',
    name: 'Assoc. Prof. Dr. Lim',
    email: 'lim.c.h@university.edu.my',
    role: Role.Supervisor,
    avatarUrl: 'https://i.pravatar.cc/150?u=P11223'
};

export let mockStudent: User = {
  id: 'S12345',
  name: 'Ahmad bin Abdullah',
  email: 'ahmad.abdullah@university.edu.my',
  role: Role.Student,
  avatarUrl: 'https://i.pravatar.cc/150?u=S12345',
  status: 'Active',
  mode: 'Full-time',
  programme: 'Doctor of Philosophy in Computer Science',
  researchTitle: 'Advanced Machine Learning Techniques for Natural Language Processing',
  hodId: mockHOD.id,
  supervisors: [
      { userId: mockSupervisor.id, role: 'Main Supervisor' },
      { userId: mockSupervisor2.id, role: 'Co-supervisor' }
  ],
  lastUpdated: addDays(today, -3),
};

export const mockAdmin: User = {
    id: 'A007',
    name: 'Admin Farhan',
    email: 'farhan.admin@university.edu.my',
    role: Role.Admin,
    avatarUrl: 'https://i.pravatar.cc/150?u=A007'
};

export const mockExaminer: User = {
    id: 'EXT01',
    name: 'Assoc. Prof. Jones',
    email: 'jones.ext@otheruni.edu',
    role: Role.Examiner,
    avatarUrl: 'https://i.pravatar.cc/150?u=EXT01'
};

export const allMockUsers: User[] = [mockStudent, mockSupervisor, mockSupervisor2, mockAdmin, mockHOD, mockExaminer];

export const mockStudentData = {
    programme: 'Doctor of Philosophy in Computer Science',
    researchTitle: 'Advanced Machine Learning Techniques for Natural Language Processing',
    supervisorId: 'P67890',
}

export let mockMilestones: Milestone[] = [
  { id: 'm1', order: 1, required: true, title: 'Research Proposal Defense', dueDate: new Date('2024-08-30'), status: MilestoneStatus.Completed, description: 'Successfully defended the research proposal.', actualCompletionDate: new Date('2024-08-28'), evidenceFile: {name: 'proposal_defense_slides.pdf', url: '#'}, history: [{action: 'ENDORSED', actorId: mockSupervisor.id, date: new Date('2024-08-28')}] },
  { id: 'm2', order: 2, required: true, title: 'Literature Review Submission', dueDate: new Date('2024-11-15'), status: MilestoneStatus.AwaitingEndorsement, description: 'Chapter 2 submission.', evidenceFile: {name: 'chapter_2_draft.docx', url: '#'}, history: [{action: 'SUBMITTED', actorId: mockStudent.id, date: addDays(today, -2)}]},
  { id: 'm3', order: 3, required: true, title: 'Data Collection Phase 1', dueDate: new Date('2025-03-01'), status: MilestoneStatus.Pending, description: 'Begin initial data gathering.', history: [] },
  { id: 'm4', order: 4, required: true, title: 'Mid-Candidature Review', dueDate: new Date('2025-07-20'), status: MilestoneStatus.Pending, description: 'Presentation to review panel.', history: [] },
  { id: 'm5', order: 5, required: false, title: 'Journal Publication (Optional)', dueDate: new Date('2026-01-15'), status: MilestoneStatus.Pending, description: 'Submit article to a Q1/Q2 journal.', history: [] },
  { id: 'm6', order: 6, required: true, title: 'Thesis Submission', dueDate: new Date('2026-06-01'), status: MilestoneStatus.Pending, description: 'Final thesis draft submission.', history: [] },
];

export const mockProgressReports: ProgressReport[] = [
  { id: 'r1', period: 'Semester 1 2024', submissionDate: new Date('2024-07-15'), status: ReportStatus.Approved },
  { id: 'r2', period: 'Semester 2 2024', status: ReportStatus.NotSubmitted },
  { id: 'r3', period: 'Semester 2 2024 (Fatimah)', submissionDate: new Date('2024-07-28'), status: ReportStatus.Submitted },
];

export let mockSupervisionLogs: SupervisionLog[] = [
  { id: 'l1', date: new Date('2024-07-22'), supervisor: 'Dr. Siti Nurhaliza', discussionPoints: 'Discussed Chapter 2 outline and potential sources.', actionsAgreed: 'Student to provide first draft by next meeting.' },
  { id: 'l2', date: new Date('2024-07-08'), supervisor: 'Dr. Siti Nurhaliza', discussionPoints: 'Reviewed feedback on proposal defense.', actionsAgreed: 'Incorporate feedback and finalize Chapter 1.' },
  { id: 'l3', date: new Date('2024-06-24'), supervisor: 'Dr. Siti Nurhaliza', discussionPoints: 'Preparation for proposal defense.', actionsAgreed: 'Conduct mock defense session.' },
];

export const mockStudyPlanTasks: StudyPlanTask[] = [
    { id: 'task1', name: 'Literature Review', start: addDays(today, -60), end: addDays(today, 30), progress: 75 },
    { id: 'task2', name: 'Methodology Design', start: addDays(today, -15), end: addDays(today, 45), progress: 40 },
    { id: 'task3', name: 'Data Collection', start: addDays(today, 31), end: addDays(today, 120), progress: 0 },
    { id: 'task4', name: 'Data Analysis', start: addDays(today, 121), end: addDays(today, 210), progress: 0 },
    { id: 'task5', name: 'Thesis Writing: Ch 1-3', start: addDays(today, -60), end: addDays(today, 60), progress: 60 },
    { id: 'task6', name: 'Thesis Writing: Ch 4-5', start: addDays(today, 211), end: addDays(today, 300), progress: 0 },
    { id: 'task7', name: 'Final Review & Submission', start: addDays(today, 301), end: addDays(today, 360), progress: 0 },
];


// --- SUPERVISOR DATA ---
export const mockSupervisorStudents = [
    { ...mockStudent, id: 'S12345', name: 'Ahmad bin Abdullah', progress: 75, status: 'On Track' },
    { id: 'S67890', name: 'Fatimah binti Saleh', progress: 40, status: 'Needs Attention', avatarUrl: 'https://i.pravatar.cc/150?u=S67890' },
    { id: 'S11223', name: 'John Doe', progress: 90, status: 'On Track', avatarUrl: 'https://i.pravatar.cc/150?u=S11223' }
];

// --- ADMIN DATA ---
export const mockAdminStats = {
    totalStudents: 1250,
    totalSupervisors: 150,
    reportsPending: 45,
    thesesSubmitted: 22
};

// --- THESIS DATA ---
export const allThesisSteps = [
    ThesisStatus.Submission, ThesisStatus.Evaluation, ThesisStatus.Acceptance, ThesisStatus.ExaminerAppointment, ThesisStatus.AppointmentApproval,
    ThesisStatus.ExaminerInvitation, ThesisStatus.ExaminerAcceptance, ThesisStatus.ExaminationViva, ThesisStatus.Recommendation, ThesisStatus.Result,
    ThesisStatus.Corrections, ThesisStatus.Resubmission, ThesisStatus.FinalAcceptance, ThesisStatus.RepositoryDeposit
];

export let mockThesisSubmission: ThesisSubmission = {
    id: 'T-S12345-1',
    version: 1,
    submittedAt: addDays(today, -45),
    status: ThesisStatus.ExaminerInvitation,
    statusHistory: [
        { status: ThesisStatus.Submission, date: addDays(today, -45), notes: 'Initial thesis submitted for review.' },
        { status: ThesisStatus.Evaluation, date: addDays(today, -40), notes: 'Supervisor and PG Admin evaluation complete.' },
        { status: ThesisStatus.Acceptance, date: addDays(today, -38), notes: 'Thesis accepted for examination.' },
        { status: ThesisStatus.ExaminerAppointment, date: addDays(today, -35), notes: 'Examiners nominated by supervisor.' },
        { status: ThesisStatus.AppointmentApproval, date: addDays(today, -30), notes: 'HOD approved examiner nominations.' },
        { status: ThesisStatus.ExaminerInvitation, date: addDays(today, -29), notes: 'Invitations sent to 2 external and 1 internal examiner.' },
    ]
};


// --- NOTIFICATIONS ---
export const mockNotifications: Record<string, Notification[]> = {
  [Role.Student]: [
      { id: 'n1', type: NotificationType.Deadline, message: 'Progress Report for Semester 2 is due in 10 days.', date: addDays(today, -1), read: false },
      { id: 'n2', type: NotificationType.Meeting, message: 'Your meeting with Dr. Siti is confirmed for tomorrow at 10 AM.', date: addDays(today, -2), read: false },
      { id: 'n3', type: NotificationType.Approval, message: 'Your Semester 1 report has been approved.', date: addDays(today, -5), read: true },
  ],
  [Role.Supervisor]: [
      { id: 'n4', type: NotificationType.Submission, message: 'Fatimah binti Saleh has submitted her progress report.', date: addDays(today, 0), read: false },
      { id: 'n5', type: NotificationType.Approval, message: 'You have 1 pending report to review.', date: addDays(today, -1), read: false },
      { id: 'n6', type: NotificationType.Meeting, message: 'Reminder: Meeting with Ahmad bin Abdullah tomorrow.', date: addDays(today, -2), read: true },
  ],
  [Role.Admin]: [
      { id: 'n7', type: NotificationType.System, message: 'System maintenance is scheduled for Sunday at 2 AM.', date: addDays(today, -1), read: false },
      { id: 'n8', type: NotificationType.Approval, message: '3 new examiner nominations are pending approval.', date: addDays(today, -3), read: true },
  ],
  [Role.HOD]: [
      { id: 'n9', type: NotificationType.Approval, message: 'Examiner nomination for student S11223 requires your approval.', date: addDays(today, -2), read: false },
  ],
  [Role.Examiner]: [],
};