/*
 * dragonDeliveryScan.h
 *
 *  Created on: Nov 11, 2021
 *      Author: cbdeboef
 */

#ifndef DRAGONDELIVERYSCAN_H_
#define DRAGONDELIVERYSCAN_H_

typedef struct{
    float ping_distance;
    int IR_distance;
    int IR_raw_value;
} dragonDelivery_scan_t;

void adc_init(void);

void servo_init(void);

void ping_init(void);

void uart_init(int baud);

void uart_interupt_init(void);

int adc_read_raw(void);

int adc_read_distance(void);

int servo_move(int degree);

long ping_read(void);

float ping_read_distance(void);

void ping_interrupt_handler(void);

void uart_sendChar(char data);

char uart_receive(void);

void uart_sendStr(const char *data);

void uart_interupt_handler(void);

void dragonDelivery_init(void);

void get_scan(int degree, dragonDelivery_scan_t * scanData);


#endif /* DRAGONDELIVERYSCAN_H_ */
