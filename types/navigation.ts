export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Search: { query?: string };
  VideoDetail: {
    videoId: string;
    title: string;
    channelName: string;
    description: string;
    publishedAt: string;
  };
};
