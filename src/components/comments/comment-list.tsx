import React from 'react'
import CommentShow from './comment-show'
import { fetchCommentByPostId } from '@/lib/query/comment'

type CommentListProps = {
    postId:string
}

const CommentList : React.FC<CommentListProps> = async ({postId}) => {
    const comments = await fetchCommentByPostId(postId);

    const topLevelComments = comments.filter((comment) => comment.parentId == null);

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <h2 className="font-bold text-xl">Comments</h2>
          <span className="bg-muted text-muted-foreground px-2 py-0.5 rounded-full text-xs font-medium">
            {comments.length}
          </span>
        </div>
        <div className="space-y-6">
          {topLevelComments.map((comment) => (
            <CommentShow
              key={comment.id}
              commentId={comment.id}
              comments={comments}
            />
          ))}
          {comments.length === 0 && (
            <p className="text-muted-foreground text-sm italic">No comments yet. Be the first to share your thoughts!</p>
          )}
        </div>
      </div>
    );
}

export default CommentList;