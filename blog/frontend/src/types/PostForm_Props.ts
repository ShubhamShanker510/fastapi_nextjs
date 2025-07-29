export type PostFormProps = {
  initialData?: {
    title: string;
    content: string;
  };
  onSubmit?: (data: { title: string; content: string }) => void;
};
