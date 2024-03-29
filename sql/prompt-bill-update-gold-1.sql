UPDATE bill b 
LEFT JOIN (
    SELECT 
        r.bill_id, 
        SUM(r.amount) AS paid_amount
    FROM receipt r
    GROUP BY r.bill_id
) AS payment_summary ON b.id = payment_summary.bill_id
SET b.status = CASE 
    WHEN payment_summary.paid_amount IS NULL THEN 'UNPAID'
    WHEN payment_summary.paid_amount >= b.amount THEN 'PAID'
    ELSE 'PARTIAL'
END;