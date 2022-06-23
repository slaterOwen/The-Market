import axios from "axios";
import config from "../../config.json";

// {
//     subject: "Toyota Tacoma",
//     user_1: "1234",
//     user_2: "5678",
//   },

const formatMessageSummary = (messages) => {
  const seenSubjects = new Set();
  const summaries = [];
  messages.forEach((m) => {
    if (!seenSubjects.has(m.subject)) {
      seenSubjects.add(m.subject);
      summaries.push({
        subject: m.subject,
        user_1: m.sender,
        user_2: m.receiver,
      });
    }
  });
  return summaries;
};

const formatConversation = (subject, conversation) => ({
  subject,
  messages: conversation,
});

export const getMessageSummary = async (id) => {
  const url = `${config.api_base.development}messages/${id}`;
  try {
    const resp = await axios.get(url);
    return {
      success: resp.status === 200,
      messageSummaries: formatMessageSummary(resp.data.messages),
    };
  } catch (e) {
    return {
      success: false,
      error: e,
    };
  }
};

export const getConversation = async (id, subject) => {
  const url = `${config.api_base.development}messages/${id}?subject=${subject}`;
  try {
    const resp = await axios.get(url);
    return {
      success: resp.status === 200,
      conversation: formatConversation(subject, resp.data.messages),
    };
  } catch (e) {
    return {
      success: false,
      error: e,
    };
  }
};

export const sendMessage = async (message) => {
  const url = `${config.api_base.development}messages`;
  try {
    const resp = await axios.post(url, message);
    return {
      success: resp.status === 201,
      message: resp.data,
    };
  } catch (e) {
    return {
      success: false,
      error: e,
    };
  }
};
