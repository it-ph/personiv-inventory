<tr>
	<th>Work Station</th>
	<th>Name</th>
	<th>Version</th>
	<th>Maker</th>
	<th>Property Code</th>
	<th>Serial</th>
	<th>Date Purchased</th>
	<th>Supplier</th>
	<th>Status</th>
</tr>

@foreach($data as $item)
	<tr>
		<td>{{ $item->name }}</td>
		<td>{{ $item->name }}</td>
		<td>{{ $item->version }}</td>
		<td>{{ $item->maker }}</td>
		<td>{{ $item->property_code }}</td>
		<td>{{ $item->serial }}</td>
		<td>{{ $item->date_purchase }}</td>
		<td>{{ $item->supplier }}</td>
		<td>{{ $item->status }}</td>
	</tr>
@endforeach