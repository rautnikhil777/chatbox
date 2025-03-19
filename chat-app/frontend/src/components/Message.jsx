import React from "react";

const Message = ({ sender, text, isOwn }) => {
  return (
    <div
      style={{
        padding: "12px",
        backgroundColor: isOwn ? "#dcf8c6" : "#e0e0e0",
        borderRadius: "18px",
        alignSelf: isOwn ? "flex-end" : "flex-start",
        maxWidth: "70%",
        boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
        fontSize: "16px",
        color: isOwn ? "#0b8043" : "#333",
        wordWrap: "break-word",
      }}
    >
      <strong>{sender}: </strong> {text}
    </div>
  );
};

export default Message;
