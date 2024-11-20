package app.weblab2backend.response;

import java.time.LocalDateTime;

public record Response(
		float x,
		float y,
		int r,
		boolean hit,
		LocalDateTime time,
		long execTime
) {
	@Override
	public String toString() {
		return String.format("""
				{"x": "%f",
				"y": "%f",
				"r": "%d",
				"hit": "%s",
				"currentTime": "%d.%d.%d %d:%d",
				"executionTime": "%d ms"}
				""",
				x,
				y,
				r,
				hit ? "Да" : "Нет(",
				time.getDayOfMonth(), time.getMonth().getValue(), time.getYear(), time.getHour(), time.getMinute(),
				execTime);
	}
}
