import masterData from '../../data/master_movement_data.json';

export interface MovementTech {
    primary_category: string;
    secondary_category: string;
    tertiary_category: string;
    title: string;
    difficulty: number;
    controller: number;
    usefulness: number;
    tags: string;
    href: string;
    original_video_url?: string;
    video_available: boolean;
}

export const loadMasterMovementData = (): MovementTech[] => {
    return masterData as MovementTech[];
};
