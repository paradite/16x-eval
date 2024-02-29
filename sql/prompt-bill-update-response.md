> ChatGPT Share Link: https://chat.openai.com/share/178a0bd2-0590-4a07-965d-cff01eb3aeba

```sql
UPDATE bill b
LEFT JOIN (
    SELECT bill_id, SUM(amount) AS total_paid
    FROM receipt
    GROUP BY bill_id
) r ON b.id = r.bill_id
SET b.status = CASE
    WHEN r.total_paid IS NULL THEN 'UNPAID'
    WHEN r.total_paid < b.amount THEN 'PARTIAL'
    WHEN r.total_paid >= b.amount THEN 'PAID'
END;
```
