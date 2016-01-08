<tr>
	<th>Work Station</th>
	<th>Brand</th>
	<th>Form</th>
	<th>Size</th>
	<th>Speed</th>
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
		<td>{{ $item->type }}</td>
		<td>{{ $item->size }}</td>
		<td>{{ $item->speed }}</td>
		<td>{{ $item->property_code }}</td>
		<td>{{ $item->serial }}</td>
		<td>{{ $item->date_purchase }}</td>
		<td>{{ $item->supplier }}</td>
		<td>{{ $item->status }}</td>
	</tr>
@endforeach