export const rightMenuMessages = [
    {
        date: "November 13, 2018",
        items: [{ time: "00:00 GMT+03:00", text: "All systems reporting at 100%", variant: "message-1" }]
    },
    {
        date: "November 12, 2018",
        items: [{ time: "00:00 GMT+03:00", text: "All systems reporting at 100%", variant: "message-1" }]
    },
    {
        date: "November 7, 2018",
        items: [
            { time: "09:23 GMT+03:00", text: "Everything operating normally.", variant: "message-1" },
            { time: "08:58 GMT+03:00", text: "We're investigating delays inupdates to PrimeFaces.org.", variant: "message-2" },
            { time: "08:50 GMT+03:00", text: "We are investigating reports of elevated error rates.", variant: "message-2" }
        ]
    }
];

export const rightMenuMessageCount = rightMenuMessages.reduce((count, group) => count + group.items.length, 0);
