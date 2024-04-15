UPDATE bill b
LEFT JOIN (
  SELECT
    bill_id,
    SUM(amount) AS paid_amount
  FROM receipt
  GROUP BY bill_id
) r ON b.id = r.bill_id
SET b.status = CASE
  WHEN r.paid_amount IS NULL THEN 'UNPAID'
  WHEN r.paid_amount < b.amount THEN 'PARTIAL'
  WHEN r.paid_amount >= b.amount THEN 'PAID'
END;
