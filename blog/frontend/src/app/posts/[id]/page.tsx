import Card from "@/components/Post_Card";

export default function PostHomePage() {
  return (
    <div className="p-6">
      <Card
        title="Noteworthy technology acquisitions 2021"
        description="Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."
        href="/posts/1"
      />
    </div>
  );
}
