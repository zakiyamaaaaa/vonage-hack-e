type Transcription = {
  agent?: string;
  user?: string;
  internal_message_uuid?: string;
  type?: "agent" | "user";
};

type Parameters = {
  CALLER_PHONE_NUMBER: string;
  CALL_START_DATE: string;
  CALL_START_TIME: string;
  CALL_DIRECTION: string;
  VAPI_CALL_ID: string;
  SESSION_ID: string;
  AGENT_ID: string;
  CONVERSATION_ID: string;
  AGENT_PHONE_NUMBER: string;
  "USER.TALK_TEXT": string;
};

type ParamList = {
  name: string;
  value_text: string;
  alteration_source: string;
  collected: boolean;
  value: string;
  entity: string;
  audio_url: string | null;
  audio_duration: number | null;
};

type AgentInformation = {
  version_id: string;
  id: string;
  name: string;
  voice: string;
  language: string;
};

type FlowData = {
  collected_tags: Array<{ tag: string; category: string }>;
  collected_parameters: ParamList[];
};

type FlowPath = {
  synchronized: boolean;
  request: {
    verb: "POST" | "GET" | "UPDATE";
    headers: string;
    payload: string;
    url: string;
  };
  node_execution_timestamp: string;
  response: {
    payload: string;
    code: number;
  };
  context: {
    output: string | null;
    user_input: string;
    altered_parameters: ParamList[];
    execution_parameters: ParamList[];
    url: string;
    status: {
      code: number;
      message: string;
    };
  };
  type: string;
  request_id: string;
  node_id: string;
  tags: string[];
  execution_time: number;
};

type ChannelData = {
  duration: number;
  audio_url?: string;
  status_code: number;
  call_status: string;
};

export type SessionResponse = {
  transcription: Transcription[];
  account_id: string;
  api_key: string;
  status: "ended" | "in_progress" | "failed";
  id: string;
  language: string;
  tags: Record<string, unknown>;
  parameters: Parameters;
  tags_list: { tag: string; category: string; count: number }[];
  params_list: ParamList[];
  agent_information: AgentInformation;
  source: string;
  destination: string;
  channel: "telephony" | "whatsapp" | "http";
  session_start_time: string;
  session_end_time: string;
  request_ids: string[];
  channel_data: ChannelData;
  flow_data: FlowData;
  flow_path: FlowPath[];
  handled_message_ids: string[];
  state: number;
  last_executed_node: FlowPath;
  last_collected_tag: string | null;
  event: {
    name: string;
    type: string;
  };
  triggers_session_id: string | null;
  campaign_id: string | null;
};

export interface MakeCallResponse {
  success: boolean;
  data?: {
    sessionId: string;
    sessionStartTime: string;
  };
  error?: string;
}

export interface SessionSearchResponse {
  success: boolean;
  lastUserMessage?: string | undefined;
  audioUrl?: string | undefined;
  error?: string;
  message?: string;
}