export interface Test {
	id: number;
	month: 3 | 4 | 6 | 7 | 9 | 10 | 11;
	grade: 1 | 2 | 3;
	subject: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
	name: string;
	question: string;
	commentary: string;
	takenAt: string;
}

export interface TestListening {
	id: number;
	testId: number;
	audio: string;
	script: string | null;
}

export interface TestRankcut {
	id: number;
	testId: number;
	grade: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
	score: number;
}