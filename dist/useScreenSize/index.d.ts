interface Parameter_Screensize {
    innerWidth: number;
    innerHeight: number;
    outerWidth: number;
    outerHeight: number;
    ratio: number;
    orientation: string | 'landscape' | 'portrait';
    difference: number;
}
/**
 * @description get the window size
 */
interface HooksScreenSize {
    innerWidth: number;
    innerHeight: number;
    outerWidth: number;
    outerHeight: number;
    ratio: number;
    orientation: string | 'landscape' | 'portrait';
    difference: number;
    fullHD: Function;
    hd: Function;
}
export default function useScreenSize(config?: Parameter_Screensize, margin?: Array<number>): HooksScreenSize;
export {};
