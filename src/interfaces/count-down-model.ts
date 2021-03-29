export interface ICountdownProps {
    minutes?: number;
    isPaused: boolean;
    onProgress: (progress: number) => void;
    onEnd: () => void
}
