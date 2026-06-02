export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Onboarding: undefined;
  MainTabs: undefined;
  LearningPath: { level: number; track?: string };
  Lesson: { id: string };
  NotFound: undefined;
};

export type TabParamList = {
  Home: undefined;
  Map: undefined;
  Review: undefined;
  Profile: undefined;
};
