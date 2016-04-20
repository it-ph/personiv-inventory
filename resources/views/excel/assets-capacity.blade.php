<tr>
	<th>Label</th>
	<th>Count</th>
</tr>
<tr>
	<td>Active</td>
	<td>{{ $active }}</td>
</tr>
<tr>
	<td>Under Repair</td>
	<td>{{ $repair }}</td>
</tr>
<tr>
	<td>Disposed</td>
	<td>{{ $dispose }}</td>
</tr>
<br>
<tr>
	<th>Work Station</th>
	<th>Brand</th>
	<th>Model</th>
	<th>Capacity</th>
	<th>Property Code</th>
	<th>Serial</th>
	<th>Date Purchased</th>
	<th>Supplier</th>
	<th>Status</th>
</tr>

@foreach($data as $item)
	<tr>
		<td>{{ $item->name }}</td>
		<td>{{ $item->brand }}</td>
		<td>{{ $item->model }}</td>
		<td>{{ $item->capacity }}</td>
		<td>{{ $item->property_code }}</td>
		<td>{{ $item->serial }}</td>
		<td>{{ $item->date_purchase }}</td>
		<td>{{ $item->supplier }}</td>
		<td>{{ $item->status }}</td>
	</tr>
@endforeach
