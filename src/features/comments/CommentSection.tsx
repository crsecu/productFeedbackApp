interface CommentSectionProps {
  children: React.ReactNode;
}

function CommentSection({ children }: CommentSectionProps): React.JSX.Element {
  return (
    <section>
      {children}
      {/* 
    CommentList
    CommentComposer
     */}
    </section>
  );
}

export default CommentSection;
