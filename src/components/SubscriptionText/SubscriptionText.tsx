import React from 'react';
import { Subscription } from '@/types/base';

type SubscriptionTextProps = {
    subscriptions: Subscription[];
};

/**
 * Formats a single subscription's cost and frequency information
 */
const formatSubscriptionText = (
    subscription: Subscription,
): React.ReactNode => (
    <>
        £{subscription.cost} {subscription.frequency}
        {subscription.costPerEvent && (
            <>
                {' '}
                (<strong>£{subscription.costPerEvent}</strong> per event)
            </>
        )}
    </>
);

/**
 * Determines the introductory text based on if a subscription offers discounts
 */
const getSubscriptionPrefix = (subscriptions: Subscription[]): string => {
    const offersDiscount = subscriptions.some(
        (sub) => sub.offersDiscountOnEventCosts,
    );
    return offersDiscount
        ? 'This group has an optional subscription to reduce event costs.'
        : 'To attend events, this group requires you pay a subscription fee.';
};

/**
 * Creates a human-readable list of subscription options
 */
const joinSubscriptionTexts = (
    subscriptions: Subscription[],
): React.ReactNode => {
    const formattedOptions: React.ReactNode[] = [];

    subscriptions.forEach((subscription, index) => {
        const text = formatSubscriptionText(subscription);

        // Add the appropriate separator based on position
        if (index === subscriptions.length - 1) {
            formattedOptions.push(<span key={index}>{text}</span>);
        } else if (index === subscriptions.length - 2) {
            formattedOptions.push(<span key={index}>{text} or </span>);
        } else {
            formattedOptions.push(<span key={index}>{text}, </span>);
        }
    });

    return formattedOptions;
};

/**
 * Displays subscription information for a group, including costs and payment frequencies.
 */
const SubscriptionText: React.FC<SubscriptionTextProps> = ({
    subscriptions,
}) => {
    if (!subscriptions?.length) return null;

    const prefix = getSubscriptionPrefix(subscriptions);

    if (subscriptions.length === 1) {
        return (
            <p>
                {prefix} The cost of this subscription is{' '}
                {formatSubscriptionText(subscriptions[0])}.
            </p>
        );
    }

    return (
        <p>
            {prefix} Options include {joinSubscriptionTexts(subscriptions)}.
        </p>
    );
};

export default SubscriptionText;
