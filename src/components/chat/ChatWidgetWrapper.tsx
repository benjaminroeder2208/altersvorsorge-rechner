import { useLocation } from "react-router-dom";
import ChatWidget from "./ChatWidget";

const HIDDEN_ROUTES = ["/impressum", "/datenschutz", "/embed"];

const ChatWidgetWrapper = () => {
  const { pathname } = useLocation();
  if (HIDDEN_ROUTES.includes(pathname)) return null;
  return <ChatWidget />;
};

export default ChatWidgetWrapper;
