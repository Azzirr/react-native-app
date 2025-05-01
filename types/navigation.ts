export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  VideoDetail: {
    videoId: string;
    title: string;
    channelName: string;
    description: string;
    publishedAt: string;
  };
  Search: {
    query: string;
  };
  Settings: undefined;
};
