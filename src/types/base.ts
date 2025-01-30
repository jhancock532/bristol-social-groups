export type Link = {
    type:
        | 'Discord'
        | 'WhatsApp'
        | 'Meetup'
        | 'Facebook'
        | 'Instagram'
        | 'TikTok'
        | 'Website'
        | string;
    url: string;
    text?: string; // Defaults to View group's website
};

export type Gender = 'Men' | 'Women' | string;
// By default it's assumed groups and events are open to all genders
// The optional `string` type allows for other / more specific gender definitions

export type Subscription = {
    frequency: 'monthly' | 'quarterly' | 'yearly'; // How often the subscription is billed
    cost: number;
    costPerEvent?: number;
    offersDiscountOnEventCosts?: boolean; // for when a subscription lowers cost for other group events.
};
