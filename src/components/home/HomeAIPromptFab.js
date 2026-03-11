import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    Box,
    Divider,
    Drawer,
    Fab,
    FormControlLabel,
    IconButton,
    Stack,
    Switch,
    TextField,
    Tooltip,
    Typography
} from "@mui/material";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import AddCommentRoundedIcon from "@mui/icons-material/AddCommentRounded";
import { AIService } from "../../services/AIService";

const HomeAIPromptFab = () => {
    const aiService = useMemo(() => new AIService(), []);
    const [open, setOpen] = useState(false);
    const [safeMode, setSafeMode] = useState(true);
    const [useLiveAI, setUseLiveAI] = useState(true);
    const [prompt, setPrompt] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [messages, setMessages] = useState(() => {
        const history = aiService.getConversationHistory();
        const firstMessage = history?.[0]?.text || "";
        const hasLegacyAnonymousBanner = firstMessage.toLowerCase().includes("anonymous test mode");

        if (history?.length && !hasLegacyAnonymousBanner) {
            return history;
        }

        return aiService.getInitialMessages(false, { anonymousMode: false, useLiveAI: true });
    });
    const chatEndRef = useRef(null);
    const isLimitReached = false;

    useEffect(() => {
        if (!open) {
            return;
        }
        chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, [messages, open]);

    useEffect(() => {
        const handleOpenPrompt = () => setOpen(true);
        window.addEventListener("open-ai-prompt", handleOpenPrompt);
        return () => {
            window.removeEventListener("open-ai-prompt", handleOpenPrompt);
        };
    }, []);

    useEffect(() => {
        aiService.saveConversation(messages);
    }, [aiService, messages]);

    const handleProcessPrompt = async () => {
        if (isSending || isLimitReached) {
            return;
        }

        setIsSending(true);
        try {
            const result = await aiService.sendPrompt({
                prompt,
                safeMode,
                messages,
                anonymousMode: false,
                useLiveAI,
                fallbackToLocal: false
            });

            if (!result) {
                return;
            }

            if (!result.normalizedPrompt) {
                return;
            }

            console.groupCollapsed(`[Local LLM] Obrada prompta ${new Date().toISOString()}`);
            console.log("Original prompt:", prompt);
            console.log("Normalized prompt:", result.normalizedPrompt);
            console.log("Prepared payload:", result.payload);
            console.log("Generated response:", result.responseText);
            console.log("Provider:", result.provider);
            if (result.liveError) {
                console.warn("Live AI error:", result.liveError);
            }
            console.groupEnd();

            setMessages((prev) => [...prev, result.userMessage, result.assistantMessage]);
            setPrompt("");
        } finally {
            setIsSending(false);
        }
    };

    const handleVoiceInputClick = async () => {
        const result = await aiService.transcribeVoiceInput();
        console.log("[Local LLM] Voice input placeholder:", result);
    };

    const handleClearConversation = () => {
        setMessages(aiService.startNewChat({ anonymousMode: false, useLiveAI }));
        setPrompt("");
    };

    return (
        <>
            <Fab
                className="mui-ai-fab"
                aria-label="AI assistant"
                onClick={() => setOpen((prev) => !prev)}
            >
                {open ? <CloseRoundedIcon /> : <SmartToyOutlinedIcon />}
            </Fab>

            <Drawer
                className="mui-ai-drawer"
                anchor="right"
                open={open}
                onClose={() => setOpen(false)}
                sx={{ zIndex: 2600 }}
                PaperProps={{ className: "mui-ai-drawer-paper" }}
            >
                <Box className="mui-ai-drawer-content" role="presentation">
                    <Typography variant="h6" className="mui-ai-title">
                        AI Prompt Assistant
                    </Typography>
                    <Typography variant="body2" className="mui-ai-subtitle">
                        {useLiveAI
                            ? "Online mode: koristi GPT preko BAI backenda."
                            : "Local mode: koristi lokalnu obradu bez poziva eksternoj mrezi."}
                    </Typography>

                    <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.12)" }} />

                    <FormControlLabel
                        control={
                            <Switch
                                checked={safeMode}
                                onChange={(e) => setSafeMode(e.target.checked)}
                                color="error"
                            />
                        }
                        label="Secure local mode"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={useLiveAI}
                                onChange={(e) => setUseLiveAI(e.target.checked)}
                                color="error"
                            />
                        }
                        label={useLiveAI ? "Online mode" : "Local mode"}
                    />

                    <Box className="mui-ai-chat">
                        {messages.map((message) => (
                            <Box
                                key={message.id}
                                className={`mui-ai-message ${message.role === "user" ? "mui-ai-message--user" : "mui-ai-message--assistant"}`}
                            >
                                <Typography className="mui-ai-message-role">
                                    {message.role === "user" ? "Ti" : "AI"}
                                </Typography>
                                <Typography variant="body2">{message.text}</Typography>
                            </Box>
                        ))}
                        <Box ref={chatEndRef} />
                    </Box>

                    <TextField
                        multiline
                        minRows={4}
                        fullWidth
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleProcessPrompt();
                            }
                        }}
                        disabled={isLimitReached}
                        placeholder="Npr: Napravi plan kako da optimizujem ucitavanje stranice i smanjim bundle."
                        className="mui-ai-input"
                    />

                    <Stack direction="row" spacing={1} sx={{ mt: 1.2 }}>
                        <Tooltip title="Zvucni unos">
                            <span>
                                <IconButton
                                    className="mui-ai-voice-btn mui-ai-action-btn"
                                    aria-label="Zvucni unos"
                                    onClick={handleVoiceInputClick}
                                >
                                    <MicRoundedIcon />
                                </IconButton>
                            </span>
                        </Tooltip>
                        <Tooltip title="Novi chat">
                            <span>
                                <IconButton
                                    className="mui-ai-voice-btn mui-ai-action-btn"
                                    aria-label="Novi chat"
                                    onClick={handleClearConversation}
                                >
                                    <AddCommentRoundedIcon />
                                </IconButton>
                            </span>
                        </Tooltip>
                        <Tooltip title={isSending ? "Obrada..." : "Obradi"}>
                            <span>
                                <IconButton
                                    className="mui-ai-voice-btn mui-ai-action-btn"
                                    aria-label="Obradi"
                                    disabled={isSending || isLimitReached}
                                    onClick={handleProcessPrompt}
                                >
                                    <SendRoundedIcon />
                                </IconButton>
                            </span>
                        </Tooltip>
                    </Stack>

                </Box>
            </Drawer>
        </>
    );
};

export default HomeAIPromptFab;
