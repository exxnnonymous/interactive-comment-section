let companyData = getCompanyData();

const currentUser = companyData.currentUser;
const comments = companyData.comments;

const AllCommentsWrapper = document.querySelector(".list_of_comments");

// updating, adding , deleting info to database

function getCompanyData() {
  const data = JSON.parse(localStorage.getItem("company_data"));
  if (data) return data;
   addDataToLocalStorageIfEmpty()
  return JSON.parse(localStorage.getItem("company_data"));
}

function saveCommentsToDatabase(comment) {
  const response = getCompanyData();
  response.comments.push(comment);

  localStorage.setItem("company_data", JSON.stringify(response));
}

function saveRepliesToDatabase(userId, userComment) {
  const response = getCompanyData();
  response.comments.forEach((comment) => {
    if (comment.id === userId) {
      comment.replies.push(userComment);
    }
  });
  localStorage.setItem("company_data", JSON.stringify(response));
}

function updateReplyDatabase(commentId,replyId ,updatedContent){
  const response = getCompanyData();
  response.comments.forEach((comment) => {
    if (comment.id === commentId) {
      comment.replies.forEach((reply)=>{
        if (reply.id === replyId){
          reply.content = updatedContent
          return
        }
      })
    }
  });
  localStorage.setItem("company_data", JSON.stringify(response));
}
function updateCommentDatabase(commentId ,updatedContent){
  const response = getCompanyData();
  response.comments.forEach((comment) => {
    if (comment.id === commentId) {
      comment.content = updatedContent
    }
  });

  localStorage.setItem("company_data", JSON.stringify(response));
}

function deleteCommentFromDatabase(id) {
  const response = getCompanyData();
  response.comments = response.comments.filter((comment) => comment.id !== id);

  localStorage.setItem("company_data", JSON.stringify(response));
}

function deleteReplyFromDatabase(commentId, replyId) {
  const response = getCompanyData();
  response.comments.forEach((comment) => {
    if (comment.id === commentId) {
      comment.replies = comment.replies.filter((reply) => reply.id !== replyId);
    }
  });

  localStorage.setItem("company_data", JSON.stringify(response));
}




// populating the website
function populateComments(comments) {
  let commentElement = "";
  comments.forEach((comment) => {
    const timeDiff = getTimeDifference(comment.createdAt);
    if (comment.user.username === currentUser.username) {
      commentElement += `
      <li class="comment_item grid" id="comment_${comment.id}" data-comment>
      <div class=" grid comment_grid_layout main_comment box-shadow">
            <div class="comment_header">
              <img
              class="small_rounded_img"
                src="${comment.user.image.png}"
                alt="${comment.user.username}_profile_picture"
              />
              <h3>${comment.user.username}</h3>
              <div class="your_reply_tag">you</div>
              <span>${timeDiff}</span>
            </div>
            <p class="comment_description">
            ${comment.content}
            </p>
            <div class="like_unlike_comment">
              <button type="button" class="btn button_like" onclick="vote(comment_${comment.id}, 'upvote')">
                <svg
                  width="11"
                  height="11"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                    fill="#C5C6EF"
                  />
                </svg>
              </button>
              <span>${comment.score}</span>
              <button type="button" class="btn button_unlike" onclick="vote(comment_${comment.id}, 'downvote')">
                <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                    fill="#C5C6EF"
                  />
                </svg>
              </button>
            </div>
            <div class="delete_edit_btn">
                       <button class="btn red_btn comment_del_btn" onclick="handleDelete('comment_${comment.id}')">
                       <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"/></svg>
                        Delete
                      </button>

                      <button class="btn purple_btn comment_edit_btn" onclick="handleEdit('comment_${comment.id}')">
                        <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"/></svg>
                        Edit
                      </button>
                      </div>
            </div>
          </li>
      `;
    } else {
      commentElement += `
        <li class="comment_item grid" id="comment_${comment.id}" data-comment>
        <div class=" grid comment_grid_layout main_comment box-shadow">
              <div class="comment_header">
                <img
                class="small_rounded_img"
                  src="${comment.user.image.png}"
                  alt="${comment.user.username}_profile_picture"
                />
                <h3>${comment.user.username}</h3>
                <span>${timeDiff}</span>
              </div>
              <p class="comment_description">
              ${comment.content}
              </p>
              <div class="like_unlike_comment">
                <button type="button" class="btn button_like" onclick="vote(comment_${comment.id},'upvote')">
                  <svg
                    width="11"
                    height="11"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                      fill="#C5C6EF"
                    />
                  </svg>
                </button>
                <span>${comment.score}</span>
                <button type="button" class="btn button_unlike" onclick="vote(comment_${comment.id},'downvote')">
                  <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                      fill="#C5C6EF"
                    />
                  </svg>
                </button>
              </div>
              <button class="btn purple_btn reply_btn" onclick="handleReply('comment_${comment.id}')">
                <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                    fill="#5357B6"
                  />
                </svg>
                Reply
              </button>
              </div>
            </li>
        `;
    }
  });

  AllCommentsWrapper.innerHTML = commentElement;
  commentElement = "";

  populateReplies(comments);
}

function populateReplies(comments) {
  comments.forEach((comment) => {
    list_of_replies = "";
    let repliesContent = "";
    if (comment.replies.length > 0) {
      const comment_container = document.getElementById(
        `comment_${comment.id}`
      );
      list_of_replies = document.createElement("ul");
      list_of_replies.classList.add("comment_replies");
      list_of_replies.classList.add("grid");

      comment.replies.forEach((reply) => {
        const timeDiff = getTimeDifference(reply.createdAt);
        if (reply.user.username === currentUser.username) {
          repliesContent += `
            <li class="reply_item_wrap" id="comment_${comment.id}_reply_${reply.id}" data-comment-reply>
                    <div class="reply_item comment_grid_layout grid box-shadow">
                      <div class="comment_header">
                        <img
                        class="small_rounded_img"
                          src="${reply.user.image.png}"
                          alt="${reply.user.username}_profile_picture"
                        />
                        <h3>${reply.user.username}</h3>
                        <div class="your_reply_tag">you</div>
                        <span>${timeDiff}</span>
                      </div>
                      <p class="comment_description"><span class="replying_to_span">@${reply.replyingTo}</span> 
                      ${reply.content}
                      </p>
                      <div class="like_unlike_comment">
                        <button type="button" class="btn button_like" onclick="voteReply(comment_${comment.id}_reply_${reply.id},'upvote')">
                          <svg
                            width="11"
                            height="11"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                              fill="#C5C6EF"
                            />
                          </svg>
                        </button>
                        <span>${reply.score}</span>
                        <button type="button" class="btn button_unlike" onclick="voteReply(comment_${comment.id}_reply_${reply.id},'downvote')">
                          <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                              fill="#C5C6EF"
                            />
                          </svg>
                        </button>
                      </div>
                      
                      <div class="delete_edit_btn">
                       <button class="btn red_btn comment_del_btn" onclick="handleDelete('comment_${comment.id}_reply_${reply.id}')">
                       <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"/></svg>
                        Delete
                      </button>

                      <button class="btn purple_btn comment_edit_btn" onclick="handleEdit('comment_${comment.id}_reply_${reply.id}')">
                        <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"/></svg>
                        Edit
                      </button>
                      </div>



                    </div>
                    </li>
                    `;
        } else {
          repliesContent += `
                <li class="reply_item_wrap" id="comment_${comment.id}_reply_${reply.id}" data-comment-reply>
                        <div class="reply_item comment_grid_layout grid box-shadow">
                          <div class="comment_header">
                            <img
                            class="small_rounded_img"
                              src="${reply.user.image.png}"
                              alt="${reply.user.username}_profile_picture"
                            />
                            <h3>${reply.user.username}</h3>
                            <span>${timeDiff}</span>
                          </div>
                          <p class="comment_description"><span class="replying_to_span">@${reply.replyingTo}</span> 
                          ${reply.content}
                          </p>
                          <div class="like_unlike_comment">
                            <button type="button" class="btn button_like" onclick="voteReply(comment_${comment.id}_reply_${reply.id},'upvote')">
                              <svg
                                width="11"
                                height="11"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                                  fill="#C5C6EF"
                                />
                              </svg>
                            </button>
                            <span>${reply.score}</span>
                            <button type="button" class="btn button_unlike" onclick="voteReply(comment_${comment.id}_reply_${reply.id},'downvote')">
                              <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                                  fill="#C5C6EF"
                                />
                              </svg>
                            </button>
                          </div>
                          <button class="btn purple_btn reply_btn" onclick="handleReply('comment_${comment.id}_reply_${reply.id}')">
                            <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                                fill="#5357B6"
                              />
                            </svg>
                            Reply
                          </button>
                        </div>
                        </li>
                        `;
        }
      });

      list_of_replies.innerHTML = repliesContent;
      repliesContent = "";
      comment_container.insertAdjacentHTML(
        "beforeend",
        list_of_replies.outerHTML
      );
    }
  });
}





// replying comment
function handleReply(val) {
  const commentElem = document.getElementById(val);
  if (commentElem.matches("[data-comment]")) {
    const insideCommentElement = commentElem.querySelector(".main_comment");
    const commentId = getIdFromElement(commentElem.id);
    const matchedComment = comments.find((comment) => comment.id === commentId);

    const replyElement = document.getElementById(
      `comment_reply_box_${commentId}`
    );

    if (!replyElement) {
      showReplyBox(
        commentId,
        currentUser,
        matchedComment,
        insideCommentElement,
        "replycomment",
        false
      );
      return;
    }

    replyElement.parentNode.removeChild(replyElement);
  }
  if (commentElem.matches("[data-comment-reply]")) {
    handleReplyComment(val, currentUser);
  }
}

function showReplyBox(
  commentId,
  currentUser,
  matchedComment,
  insideCommentElement,
  isComment,
  parentId
) {
  let reply_box = document.createElement("div");
  reply_box.className = "reply_box grid bg-box-gray box-shadow";
  reply_box.id = `comment_reply_box_${commentId}`;
  reply_box.innerHTML = generateReplyBox(
    currentUser,
    isComment,
    matchedComment,
    commentId,
    parentId
  );

  insideCommentElement.insertAdjacentElement("afterend", reply_box);
  const commentTextArea = document.getElementById(
    `comment_textarea_${commentId}_reply`
  );

  setCaretPosition(commentTextArea, matchedComment.user.username.length + 2);
}

function handleReplyComment(val) {
  const parentId = parseInt(getIdFromReply(val)[0]);
  const replyId = parseInt(getIdFromReply(val)[1]);

  const replyElement = document.getElementById(val);

  const replyBox = document.getElementById(`comment_reply_box_${replyId}`);

  if (!replyBox) {
    const matchedComment = comments.find((comment) => comment.id === parentId);
    const matchedReply = matchedComment.replies.find(
      (comment) => comment.id === replyId
    );
    showReplyBox(
      replyId,
      currentUser,
      matchedReply,
      replyElement,
      "replyreply",
      parentId
    );
    return;
  }
  replyBox.parentNode.removeChild(replyBox);
}

function generateReplyBox(currentUser, isComment, matchedComment, commentId,parentId) {
  if (isComment === "replycomment") {
    return `<div class="reply-box-pro-img">
                 <img class="small_rounded_img" src="${currentUser.image.png}" alt="profile-pic">
               </div>
               <textarea placeholder="Reply to ${matchedComment.user.username}" name="comment-reply-box" id="comment_textarea_${commentId}_reply">@${matchedComment.user.username} </textarea>
               <button class="btn bg-purple" onclick="confirmReplyComment('comment_textarea_${commentId}_reply',${commentId},'${matchedComment.user.username}')">REPLY</button>
    `;
  } else {
    return `<div class="reply-box-pro-img">
    <img class="small_rounded_img" src="${currentUser.image.png}" alt="profile-pic">
  </div>
  <textarea placeholder="Reply to ${matchedComment.user.username}" name="comment-reply-box" id="comment_textarea_${commentId}_reply">@${matchedComment.user.username} </textarea>
  <button class="btn bg-purple" onclick="confirmReplyReply('comment_textarea_${commentId}_reply',${commentId},${parentId}, '${matchedComment.user.username}')">REPLY</button>
`;
  }
}


function confirmReplyComment(elementId, id, username) {
  const replyTextarea = document.getElementById(elementId);
  const replyUser = getUserById(id);
  if (replyTextarea.value.length <= 0) {
    alert("Please write something...");
    replyTextarea.focus()
    return;
  }

  const cleanContent = removeProfileName(replyTextarea.value,username)
  const comment = {
    id: Math.floor(Math.random() * 1000000 + 1),
    content: cleanContent,
    createdAt: new Date(),
    score: 0,
    replyingTo: replyUser.user.username,
    user: currentUser,
  };
  saveRepliesToDatabase(id, comment);

  const replyElement = document.getElementById(`comment_reply_box_${id}`);
  replyElement.parentNode.removeChild(replyElement);

  updateDom();
}

function confirmReplyReply(elementId,replyId, commentId, username){
  const replyTextarea = document.getElementById(elementId);
  const replyUser = getReplyUser(replyId,commentId);
  if (replyTextarea.value.length <= 0) {
    alert("Please write something...");
    replyTextarea.focus()
    return;
  }
  const cleanContent = removeProfileName(replyTextarea.value,username)
  const reply = {
    id: Math.floor(Math.random() * 1000000 + 1),
    content: cleanContent,
    createdAt: new Date(),
    score: 0,
    replyingTo: replyUser.user.username,
    user: currentUser,
  };

  saveRepliesToDatabase(commentId, reply);

  const replyBox = document.getElementById(`comment_textarea_${replyId}_reply`)
  replyBox.parentNode.removeChild(replyBox);

  updateDom();
}




// updating comment
function handleEdit(val) {
  
  const element = document.getElementById(val)
  if (element.matches("[data-comment]")) {
    handleEditComment(val)
    return
  }
  
  handleEditReply(val)
  
}


function handleEditReply(val){
  const [commentId, replyId] = getIdFromReply(val)

  const replyElement  = document.getElementById(val)

  const replyUser = getReplyUser(parseInt(replyId),parseInt(commentId))
  const replyingTo = replyUser.replyingTo

  const replyTextBox = document.getElementById(
    `textarea_${commentId}_edit_${replyId}`
  );

  if (!replyTextBox) {
    const delBtn = replyElement.querySelector(".comment_del_btn")
    const editBtn = replyElement.querySelector(".comment_edit_btn")
    delBtn.disabled = true
    editBtn.disabled = true
    
    const descriptionElement = replyElement.querySelector(".comment_description")
    descriptionElement.classList.add("flex_comment")
    const paragraphContent = descriptionElement.innerText
  
    descriptionElement.innerHTML = ` <textarea name="comment-reply-box" class="reply_edit_textarea" id="textarea_${commentId}_edit_${replyId}">${paragraphContent}</textarea>
    <button class="btn bg-purple update_btn" onclick="handleUpdateReply(${commentId}, ${replyId},textarea_${commentId}_edit_${replyId},'${replyingTo}')">UPDATE</button>`
  
    const replyTextArea = document.getElementById(
      `textarea_${commentId}_edit_${replyId}`
    );
    setCaretPosition(replyTextArea, paragraphContent.length + 1);

    return
  }
}

function handleEditComment(val){
  const commentElement  = document.getElementById(val)
  const commentId = getIdFromElement(commentElement.id);
  const commentTextBox = document.getElementById(
    `textarea_${commentId}_edit`
  );

  if (!commentTextBox) {
    const delBtn = commentElement.querySelector(".comment_del_btn")
    const editBtn = commentElement.querySelector(".comment_edit_btn")
    delBtn.disabled = true
    editBtn.disabled = true
    
    const descriptionElement = commentElement.querySelector(".comment_description")
    descriptionElement.classList.add("flex_comment")
    const paragraphContent = descriptionElement.innerText
  
    descriptionElement.innerHTML = ` <textarea name="comment-reply-box" class="reply_edit_textarea" id="textarea_${commentId}_edit">${paragraphContent}</textarea>
    <button class="btn bg-purple update_btn" onclick="handleUpdateComment(${commentId},textarea_${commentId}_edit)">UPDATE</button>`
  
    const commentTextArea = document.getElementById(
      `textarea_${commentId}_edit`
    );
    setCaretPosition(commentTextArea, paragraphContent.length + 1);

    return
  }
}

function handleUpdateReply(parentId, replyId, textarea,replyingTo){
  const cleanContent = removeProfileName(textarea.value,replyingTo)
  if(cleanContent.length <= 0){
    alert("Please write something...")
    textarea.focus()
    return
  }
  updateReplyDatabase(parentId, replyId, cleanContent)
    updateDom();
}


function handleUpdateComment(commentId, textarea){
  if(textarea.value.length <= 0){
    alert("Please write something...")
    textarea.focus()
    return
  }
  updateCommentDatabase(commentId, textarea.value)
  updateDom();
}




// upvote, downvote comments
function vote(elem, condition){
  const main_comment = elem.querySelector(".main_comment");
  upDownVote(main_comment,condition)
}


function voteReply(elem, condition){
  upDownVote(elem,condition)
}


function upDownVote(elem, condition){
  const like_unlike_box = elem.querySelector(".like_unlike_comment")
  const like_btn = like_unlike_box.querySelector('.button_like')
  const score = like_unlike_box.querySelector("span")
  if(condition === "upvote"){
    if(score.classList.contains('upvoted')) return
    score.innerText = parseInt(score.innerText) + 1
    score.classList.add('upvoted')
    score.classList.remove('downvoted')
    like_btn.classList.add('button_purple')

    return
  }
  if(score.classList.contains('upvoted')){
    if(score.classList.contains('downvoted')) return
    score.innerText = parseInt(score.innerText) - 1
    score.classList.add('downvoted')
    score.classList.remove('upvoted')
  
    like_btn.classList.remove('button_purple')
  }
}




//  sending comment
function handleSendComment() {
  const commentTextarea = document.getElementById("main_comment_area");
  if (commentTextarea.value.length <= 0) {
    alert("Please write something...");
    commentTextarea.focus()
    return;
  }
  const comment = {
    id: Math.floor(Math.random() * 1000000 + 1),
    content: commentTextarea.value,
    createdAt: new Date(),
    score: 0,
    user: currentUser,
    replies: [],
  };
  saveCommentsToDatabase(comment);
  commentTextarea.value = "";

  updateDom();
}






// deleting comment function
function handleDelete(val) {
  const commentElem = document.getElementById(val);
  const id = getIdFromElement(val);
  const modal = displayModal();

  const cancelBtn = modal.querySelector("#cancel_delete_btn");
  const delBtn = modal.querySelector("#delete_btn");

  cancelBtn.addEventListener("click", hideModal);
  delBtn.addEventListener("click", () => {
    if (commentElem.matches("[data-comment]")) {
      deleteCommentFromDatabase(id);
    } else if (commentElem.matches("[data-comment-reply]")) {
      const commentId = getIdFromReply(val)[0];
      const replyId = getIdFromReply(val)[1];
      deleteReplyFromDatabase(parseInt(commentId), parseInt(replyId));
    }
    hideModal();
    updateDom();
  });
}

// hiding showing modal
function displayModal() {
  const modalElement = document.getElementById("modal_element");
  modalElement.classList.remove("modal_hide");
  return modalElement;
}

function hideModal() {
  const modalElement = document.getElementById("modal_element");
  modalElement.classList.add("modal_hide");
}



/////////////////////////////////////// utility functions ////////////////////////

// set caret position in textarea

function setCaretPosition(ctrl, pos) {
  if (ctrl.setSelectionRange) {
    ctrl.focus();
    ctrl.setSelectionRange(pos, pos);
  } else if (ctrl.createTextRange) {
    var range = ctrl.createTextRange();
    range.collapse(true);
    range.moveEnd("character", pos);
    range.moveStart("character", pos);
    range.select();
  }
}

// handle showing time

function getTimeDifference(givenDate) {
  let time = minuteDiff(new Date(givenDate), new Date());

  if (time <= 0) return "Just now";

  if (time <= 60) {
    return `${time} min ago`;
  }
  time = hourDiff(new Date(givenDate), new Date());
  if (time <= 24) {
    return `${time} hour ago`;
  }

  time = dayDiff(new Date(givenDate), new Date());
  if (time <= 6) {
    return `${time} days ago`;
  }

  time = weekDiff(new Date(givenDate), new Date());
  if (time <= 4) {
    return `${time} weeks ago`;
  }
  time = monthDiff(new Date(givenDate), new Date());
  if (time <= 20) {
    return `${time} months ago`;
  }
  time = yearDiff(new Date(givenDate), new Date());
  return `${time} year ago`;

  function minuteDiff(dt1, dt2) {
    let diffMin = (dt2.getTime() - dt1.getTime()) / 1000 / 60;
    return Math.round(diffMin);
  }
  function hourDiff(dt1, dt2) {
    let diffHour = (dt2.getTime() - dt1.getTime()) / 1000 / 3600;
    return Math.round(diffHour);
  }
  function dayDiff(dt1, dt2) {
    let diffTime = dt2.getTime() - dt1.getTime();
    let daysDiff = diffTime / (1000 * 3600 * 24);
    return Math.round(daysDiff);
  }

  function weekDiff(dt1, dt2) {
    let diffWeek = (dt2.getTime() - dt1.getTime()) / 1000;
    diffWeek /= 60 * 60 * 24 * 7;
    return Math.abs(Math.round(diffWeek));
  }
  function monthDiff(dt1, dt2) {
    let diffMonth = (dt2.getTime() - dt1.getTime()) / 1000;
    diffMonth /= 60 * 60 * 24 * 7 * 4;
    return Math.abs(Math.round(diffMonth));
  }
  function yearDiff(dt1, dt2) {
    let diffYear = (dt2.getTime() - dt1.getTime()) / 1000;
    diffYear /= 60 * 60 * 24;
    return Math.abs(Math.round(diffYear / 365.25));
  }
}

// get number from string
function getIdFromReply(string) {
  var txt = string;
  var numb = txt.match(/[0-9]{0,1000000}_reply_[0-9]{0,1000000}/g);
  numb = numb.join("");
  return numb.split("_reply_");
}
function getIdFromElement(string) {
  return parseInt(string.split("_")[1]);
}

// get user from from localstorage
function getUserById(id) {
  const comments = getCompanyData().comments;
  return comments.find((comment) => comment.id === id);
}
function getReplyUser(replyId, commentId) {
  const comments = getCompanyData().comments;
  const comment = comments.find((comm) => comm.id === commentId);
  const reply = comment.replies.find((reply) => reply.id === replyId)
  return reply
  
}


// updating dom
function updateDom() {
  const data = getCompanyData();
  populateComments(data.comments);
}

//using regex to remove profile name ('removing @happy' from "@happy Hi! Nice to hear.....")
function removeProfileName(string, user){
  string = string.trimStart();
  const pattern = `^@${user}`
  const regex = new RegExp(pattern);
  const filtered = string.replace(regex, "")
  return filtered.trimStart()
}


// adding dummy data if localstorage is empty
function addDataToLocalStorageIfEmpty(){
  const data = {
  "currentUser": {
    "image": {
      "png": "./images/avatars/image-juliusomo.png",
      "webp": "./images/avatars/image-juliusomo.webp"
    },
    "username": "juliusomo"
  },
  "comments": [
    {
      "id": 1,
      "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      "createdAt": new Date(2021, 10, 4, 10, 33, 30, 0),
      "score": 12,
      "user": {
        "image": {
          "png": "./images/avatars/image-amyrobson.png",
          "webp": "./images/avatars/image-amyrobson.webp"
        },
        "username": "amyrobson"
      },
      "replies": [
      ]
    },
    {
      "id": 2,
      "content": "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      "createdAt": new Date(2021, 12, 10, 1, 20, 10, 50),
      "score": 5,
      "user": {
        "image": {
          "png": "./images/avatars/image-maxblagun.png",
          "webp": "./images/avatars/image-maxblagun.webp"
        },
        "username": "maxblagun"
      },
      "replies": [
        {
          "id": 3,
          "content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
          "createdAt": new Date(2021, 12, 18, 10, 33, 30, 0),
          "score": 4,
          "replyingTo": "maxblagun",
          "user": {
            "image": {
              "png": "./images/avatars/image-ramsesmiron.png",
              "webp": "./images/avatars/image-ramsesmiron.webp"
            },
            "username": "ramsesmiron"
          }
        },
        {
          "id": 4,
          "content": "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
          "createdAt": new Date(2022, 1, 2, 15, 33, 30, 0),
          "score": 2,
          "replyingTo": "ramsesmiron",
          "user": {
            "image": {
              "png": "./images/avatars/image-juliusomo.png",
              "webp": "./images/avatars/image-juliusomo.webp"
            },
            "username": "juliusomo"
          }
        }
      ]
    }
  ]
}
localStorage.setItem('company_data', JSON.stringify(data))


}



populateComments(comments);