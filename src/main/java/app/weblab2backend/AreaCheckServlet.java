package app.weblab2backend;

import app.weblab2backend.response.Response;
import app.weblab2backend.littlehelpers.Checker;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.util.LinkedList;

@WebServlet(name = "areaCheckServlet", value = "/area-check-servlet")
public class AreaCheckServlet extends HttpServlet {

	private Integer r;
	private Float x, y;

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
		long startTime = System.currentTimeMillis();
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		if (!validate(request.getParameter("x"), request.getParameter("y"), request.getParameter("r"))) {
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
			return;
		}
		System.out.println("Checking hit...");
		boolean hit = checkHit(x, y, r);
		System.out.println(hit ? "hit" : "miss");
		PrintWriter out = response.getWriter();
		LocalDateTime time = LocalDateTime.now();
		long execTime = System.currentTimeMillis() - startTime;
		Response rb = new Response(
				x,
				y,
				r,
				hit,
				time,
				execTime
		);
		if (request.getSession().getAttribute("dots") == null) request.getSession().setAttribute("dots", new LinkedList<Response>());
		((LinkedList<Response>)request.getSession().getAttribute("dots")).add(rb);
		System.out.printf("number of dots in current session: %d\n", ((LinkedList<Response>)request.getSession().getAttribute("dots")).size());
		out.println(rb);
		System.out.println("Sent response successfully");
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
		response.getWriter().println();
	}

	protected boolean validate(String x, String y, String r) {
		boolean valid = true;
		valid &= !x.isBlank() && !y.isBlank() && !r.isBlank();
		valid &= checkFloat(x, "3") && checkFloat(y, "5") && checkFloat(y, "3") && checkInt(r);
		if (!valid) return false;
		System.out.println("Valid data");
		this.x = Float.parseFloat(x);
		this.y = Float.parseFloat(y);
		this.r = Integer.parseInt(r);
		return checkBounds(this.x, this.y, this.r);
	}

	private boolean checkBounds(double x, double y, int r) {
		return x >= -3 && x <= 3
				&& y >= -5 && y <= 3
				&& r >= 1 && r <= 5;
	}

	private boolean checkFloat(String num, String bound) {
		if (num.contains(bound + ".")  && num.length() > 2) {
			char[] s = num.toCharArray();
			for (int j = 2; j < s.length; j++) {
				if (s[j] != '0') {
					System.err.println("Number out of bounds");
					return false;
				}
			}
		}
		try {
			Float.parseFloat(num);
		} catch (NumberFormatException e) {
			System.err.println("Error parsing number: " + num);
			return false;
		}
		return true;
	}

	private boolean checkInt(String num) {
		try {
			Integer.parseInt(num);
		} catch (NumberFormatException e) {
			System.err.println("Error parsing number: " + num);
			return false;
		}
		return true;
	}

	protected boolean checkHit(float x, float y, int r) {
		return Checker.check(x, y, r);
	}
}
