package edu.iastate.cs228.hw1;

/**
 * 
 * @author Drake Ridgeway
 *
 */

import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.util.InputMismatchException;
import java.io.File;
import java.util.Scanner;
import java.util.ArrayList;


/**
 * 
 * This class sorts all the points in an array of 2D points to determine a reference point whose x and y 
 * coordinates are respectively the medians of the x and y coordinates of the original points. 
 * 
 * It records the employed sorting algorithm as well as the sorting time for comparison. 
 *
 */
public class PointScanner  
{
	private Point[] points; 
	
	private Point medianCoordinatePoint;  // point whose x and y coordinates are respectively the medians of 
	                                      // the x coordinates and y coordinates of those points in the array points[].
	private Algorithm sortingAlgorithm;    
	
		
	protected long scanTime; 	       // execution time in nanoseconds. 
	
	/**
	 * This constructor accepts an array of points and one of the four sorting algorithms as input. Copy 
	 * the points into the array points[].
	 * 
	 * @param  pts  input array of points 
	 * @throws IllegalArgumentException if pts == null or pts.length == 0.
	 */
	public PointScanner(Point[] pts, Algorithm algo) throws IllegalArgumentException
	{
		if (pts == null) {
			throw new IllegalArgumentException("pts was null.");
		}
		
		if (pts.length == 0) {
			throw new IllegalArgumentException("the array was empty.");
		}
		
		points = pts;
		this.sortingAlgorithm = algo;
	}


	
	/**
	 * This constructor reads points from a file. 
	 * 
	 * @param  inputFileName
	 * @throws FileNotFoundException 
	 * @throws InputMismatchException   if the input file contains an odd number of integers
	 */
	protected PointScanner(String inputFileName, Algorithm algo) throws FileNotFoundException, InputMismatchException
	{
		// TODO
		ArrayList<Point> obj = new ArrayList<Point>();
		this.sortingAlgorithm = algo;
		int x = 0;
		int y = 0;
		try {
			File f = new File(inputFileName);
			Scanner scnr = new Scanner(f);
			while(scnr.hasNextInt()) {
				x = scnr.nextInt();
				if (!scnr.hasNextInt()) {
					throw new InputMismatchException("Odd number of integers.");
				}
				y = scnr.nextInt();
				obj.add(new Point(x, y));
			}
			points = new Point[obj.size()];
			for (int i = 0; i < points.length; i++) {
				points[i] = obj.get(i);
			}
		}
		catch (FileNotFoundException f) {
			System.out.println("ERROR: File not found.");
		}		
	}

	
	/**
	 * Carry out two rounds of sorting using the algorithm designated by sortingAlgorithm as follows:  
	 *    
	 *     a) Sort points[] by the x-coordinate to get the median x-coordinate. 
	 *     b) Sort points[] again by the y-coordinate to get the median y-coordinate.
	 *     c) Construct medianCoordinatePoint using the obtained median x- and y-coordinates.     
	 *  
	 * Based on the value of sortingAlgorithm, create an object of SelectionSorter, InsertionSorter, MergeSorter,
	 * or QuickSorter to carry out sorting.       
	 * @param algo
	 * @return
	 */
	public void scan()
	{
		// TODO  
		AbstractSorter aSorter;
		
		if (sortingAlgorithm == Algorithm.SelectionSort) {
			aSorter = new SelectionSorter(this.points);
		} else {
			if (sortingAlgorithm == Algorithm.InsertionSort) {
				aSorter = new InsertionSorter(this.points);
			} else {
				if (sortingAlgorithm == Algorithm.MergeSort) {
					aSorter = new MergeSorter(this.points);
				} else {
					aSorter = new QuickSorter(this.points);
				}
			}
		}
		
		// create an object to be referenced by aSorter according to sortingAlgorithm. for each of the two 
		// rounds of sorting, have aSorter do the following: 
		// 
		//     a) call setComparator() with an argument 0 or 1. 
		//
		//     b) call sort(). 		
		// 
		//     c) use a new Point object to store the coordinates of the Median Coordinate Point
		//
		//     d) set the medianCoordinatePoint reference to the object with the correct coordinates.
		//
		//     e) sum up the times spent on the two sorting rounds and set the instance variable scanTime. 
			
		int x = 0;
		int y = 0;		
		long startingTime = System.nanoTime();
		aSorter.setComparator(0);
		aSorter.sort();
		x = aSorter.getMedian().getX();
		aSorter.setComparator(1);
		aSorter.sort();
		y = aSorter.getMedian().getY();
		long endTime = System.nanoTime();
		this.scanTime = endTime - startingTime;
	}
	
	
	/**
	 * Outputs performance statistics in the format: 
	 * 
	 * <sorting algorithm> <size>  <time>
	 * 
	 * For instance, 
	 * 
	 * selection sort   1000	  9200867
	 * 
	 * Use the spacing in the sample run in Section 2 of the project description. 
	 */
	public String stats()
	{
		return ("" + this.sortingAlgorithm + "   " + this.points.length + "     " + this.scanTime);
		// TODO
	}
	
	
	/**
	 * Write MCP after a call to scan(),  in the format "MCP: (x, y)"   The x and y coordinates of the point are displayed on the same line with exactly one blank space 
	 * in between. 
	 */
	@Override
	public String toString()
	{
		return "MCP: (" + medianCoordinatePoint.toString() + ")";
		// TODO
	}

	
	/**
	 *  
	 * This method, called after scanning, writes point data into a file by outputFileName. The format 
	 * of data in the file is the same as printed out from toString().  The file can help you verify 
	 * the full correctness of a sorting result and debug the underlying algorithm. 
	 * 
	 * @throws FileNotFoundException
	 */
	public void writeMCPToFile(String outputFileName) throws FileNotFoundException
	{
		// TODO 
		try {
			
			File f = new File(outputFileName);
			PrintWriter pw = new PrintWriter(f);
			pw.write(toString());
			pw.close();
		} catch (FileNotFoundException f) {
			System.out.println("ERROR: File not found.");
		}
	}	

	

		
}
