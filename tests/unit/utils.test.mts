import { describe, it, expect } from 'vitest';
import { compareVersions, getThemeFromSchedule } from '../../js/utils.js';

describe('utils.js', () => {
    describe('compareVersions', () => {
        it('should return 0 for equal versions', () => {
            expect(compareVersions('1.0.0', '1.0.0')).toBe(0);
        });

        it('should return 1 when v1 is greater', () => {
            expect(compareVersions('1.0.1', '1.0.0')).toBe(1);
            expect(compareVersions('2.0.0', '1.9.9')).toBe(1);
            expect(compareVersions('1.1.0', '1.0.9')).toBe(1);
        });

        it('should return -1 when v2 is greater', () => {
            expect(compareVersions('1.0.0', '1.0.1')).toBe(-1);
            expect(compareVersions('1.0.0', '2.0.0')).toBe(-1);
            expect(compareVersions('1.0', '1.0.1')).toBe(-1);
        });

        it('should handle different length version strings', () => {
            expect(compareVersions('1.0', '1.0.0')).toBe(0); // 視為相等
            expect(compareVersions('1.0.1.2', '1.0.1')).toBe(1);
        });
    });

    describe('getThemeFromSchedule', () => {
        it('should return "dark" during night time (e.g., 20:00)', () => {
            const nightTime = new Date('2023-01-01T20:00:00');
            expect(getThemeFromSchedule(nightTime)).toBe('dark');
        });

        it('should return "dark" during early morning (e.g., 03:00)', () => {
            const earlyMorning = new Date('2023-01-01T03:00:00');
            expect(getThemeFromSchedule(earlyMorning)).toBe('dark');
        });

        it('should return "light" during day time (e.g., 12:00)', () => {
            const dayTime = new Date('2023-01-01T12:00:00');
            expect(getThemeFromSchedule(dayTime)).toBe('light');
        });

        it('should return "light" at 06:00 (exact boundary)', () => {
            // Assuming 06:00 is light start based on logic: hour >= 18 || hour < 6
            const sixAm = new Date('2023-01-01T06:00:00');
            expect(getThemeFromSchedule(sixAm)).toBe('light');
        });

        it('should return "dark" at 18:00 (exact boundary)', () => {
            const sixPm = new Date('2023-01-01T18:00:00');
            expect(getThemeFromSchedule(sixPm)).toBe('dark');
        });
    });
});
