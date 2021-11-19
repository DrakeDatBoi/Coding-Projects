package edu.iastate.cs228.hw3;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.Stack;


/*
 * 
 * @author Drake Ridgeway
 * 
 */
public class Infix2Postfix {

	public static void main(String[] args) throws FileNotFoundException, IOException {
		
		Infix2Postfix ip = new Infix2Postfix();
		File input = new File("input.txt");
		FileWriter output = new FileWriter("output.txt");
		PrintWriter pw = new PrintWriter(output);
		Scanner scnr = new Scanner(input);
		String infix = "";
		while (scnr.hasNextLine()) {
			infix = scnr.nextLine();
			System.out.println("Infix: " + infix);
			pw.print(ip.calculate(infix));
			System.out.println("Postfix: " + ip.calculate(infix));
		}
		pw.close();
		scnr.close();			
	}
	
	private int getPriority(char c) { //Method that checks priority for the operators which will affect what the stack does
		
		if (c == '+' || c == '-') {
			return 1;
		} else {
			if (c == '*' || c == '/' || c == '^' || c == '%') {
				return 2;
			} else {
				return -1;
			}
		}
	}
	
	private String infixPostfix(List<String> postFixList) throws ArithmeticException {  //Taking our infix and turning it into postfix
		
		int operands = 0;
		int operators = 0;
		int leftParenthesis = 0;
		int rightParenthesis = 0;
		String postfix = "";
		Stack<Character> stack = new Stack<>();
		for (int i = 0; i < postFixList.size(); i++) {
			String s = postFixList.get(i);
			if (!s.equals("+") && !s.equals("-") && !s.equals("*") && !s.equals("/") && !s.equals("^") && !s.equals("%") && !s.equals("(") && !s.equals(")")) {  //Checks for operands and operators
				postfix += s + " ";  //if it's an operand
				operands++;
			} else {
				if (stack.isEmpty()) {  //If the stack is empty, and it detects an operator, it will automatically push the operator on the stack
					stack.push(s.charAt(0));  //if it's an operator or a parenthesis
					if (s.equals("(")) {
						leftParenthesis++;
					}
					if (s.equals(")")) {
						rightParenthesis++;
					} else {
						operators++;
					}
				} else {
					if (s.equals("(")) { //Automatically pushes a left parenthesis on the stack, highest priority
						if (postFixList.get(i + 1).equals(")")) { //Checks for empty parenthesis pair
							throw new ArithmeticException("Error: No subexpression detected");
						}
						stack.push(s.charAt(0));
						leftParenthesis++;
					} else {
						if (s.equals(")")) {  //If it is a right parenthesis, it will go through the stack
							Character c = stack.pop();
							rightParenthesis++;
							while (c != '(') {
								if (stack.isEmpty()) {  //Checking for a corresponding left parenthesis
									throw new ArithmeticException("Error: No opening parenthesis detected");	
								}
								postfix += c + " ";
								c = stack.pop();
							}
						}
						else if (getPriority(s.charAt(0)) > getPriority(stack.peek())){  //Getting the priority of the operators
							stack.push(s.charAt(0));
							if (s.equals("(")) {
								leftParenthesis++;
							} else {
								operators++;
							}
						} else {
							postfix += stack.pop() + " ";
							stack.push(s.charAt(0));
							if (s.equals("(")) {
								leftParenthesis++;
							} else {
								operators++;
							}
						}
					}
				}
			}
		}	
		postfix += stack.pop() + " ";
		if (operators >= operands) {
			throw new ArithmeticException("Error: Too many operators");
		}
		if (operands < operators + 1) {
			throw new ArithmeticException("Error: Too many operands");
		}
		if (leftParenthesis > rightParenthesis) {                                                  //Checking for other errors
			throw new ArithmeticException("Error: No closing parenthesis detected");
		}
		return postfix;
	}
	
	private List<String> getPostFix(String s) {  //Retrieves the postfix, used for Calculate method
		
		List<String> postFixList = new ArrayList<>();
		Scanner scnr = new Scanner(s);
		while(scnr.hasNext()) {
			postFixList.add(scnr.next());
		}	
		scnr.close();
		return postFixList;
    }
	
	public String calculate(String s) {  //Retrieves the postfix from infixPostfix, from the getPostFix method, used in main method
		
		List<String> postFixString = getPostFix(s);
		return infixPostfix(postFixString);
	}
}
