package app.weblab2backend.littlehelpers;

public class Checker {

	public static boolean check(float x, float y, int r) {
		return checkFirst(x, y, r) || checkSecond(x, y, r) || checkThird(x, y, r) || checkFourth(x, y, r);
	}

	private static boolean checkFirst(float x, float y, int r) {
		if (x >= 0 && y >= 0) {
			return x * x + y * y <= r * r;
		}
		return false;
	}

	private static boolean checkSecond(float x, float y, int r) {
		if (x >= 0 && y <= 0) { // y >= x - r/2
			return y >= x - ((float) r)/2;
		}
		return false;
	}

	private static boolean checkThird(float x, float y, int r) {
		if (x <= 0 && y <= 0) {
			return false;
		}
		return false;
	}

	private static boolean checkFourth(float x, float y, int r) {
		if (x <= 0 && y >= 0) {
			return x >= -r && y <= r;
		}
		return false;
	}
}
