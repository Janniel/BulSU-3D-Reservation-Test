<?php
// Calculate the remaining time and format it
$remainingTime = max(0, $end_time_milliseconds - time() * 1000);
$minutes = floor($remainingTime / (1000 * 60));
$seconds = floor(($remainingTime % (1000 * 60)) / 1000);
echo $minutes . 'm ' . $seconds . 's';
?>
