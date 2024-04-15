const createComment = async (featureId, commentBody) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/features/${featureId}/create_comment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: {
            body: commentBody,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create comment");
    }

    const data = await response.json();
    console.log("Comment created:", data);
  } catch (error) {
    console.error("Error creating comment:", error);
  }
};

// Llamar a la función createComment para crear un comentario asociado a un feature
createComment(1, "Este es un comentario");
